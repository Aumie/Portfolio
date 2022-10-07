"""
Database models.
"""
import uuid
import os
from django.conf import settings
from datetime import date
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.utils.text import slugify
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


def aum_file_path(instance, filename):
    """Generate filepath for aum's file."""
    return os.path.join('uploads', 'AumProfile',
                        filename)


def post_image_file_path(instance, filename):
    """Generate filepath for new post image."""
    ext = os.path.splitext(filename)[1]
    filename = f'{uuid.uuid4()}{ext}'

    return os.path.join('uploads', 'blogs',
                        date.today().strftime('%Y/%m/%d/'),
                        filename)


class UserManager(BaseUserManager):
    """Manager for user"""
    # create_user = func from django

    def create_user(self, email, name, password=None, **extra_fields):
        """Create, save and return a new user"""
        if not email:
            raise ValueError(_('User must have an email address.'))

        # noremalize_email from BaseUserManager
        user = self.model(email=self.normalize_email(email),
                          name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        """Create and return a new superuser"""
        user = self.create_user(email, name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    user_image = models.ImageField(null=True, blank=True,
                                   upload_to=post_image_file_path)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    @property
    def user_id(self):
        return self.pk

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)
    cover_image = models.ImageField(null=True, blank=True,

                                    upload_to=post_image_file_path)
    desc = models.CharField(max_length=1024, blank=True, null=True)
    content = models.TextField(null=True, blank=True)
    tags = models.ManyToManyField('Tag', blank=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    published = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('blog-details', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class Tag(models.Model):
    """Tag for filtering post."""
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                   on_delete=models.CASCADE,
                                   )

    def __str__(self):
        return self.name


class Image(models.Model):
    """Tag for filtering post."""
    image = models.ImageField(null=True, blank=True,
                              upload_to=post_image_file_path)
    # on_post = models.ForeignKey(Post, related_name='images',
    #                             on_delete=models.CASCADE)

    def __str__(self):
        return str(self.image)

    @property
    def path(self) -> str:
        return str(self.image)


class AumImage(models.Model):
    title = models.CharField(max_length=120, blank=True, null=True)
    desc = models.CharField(max_length=512, blank=True, null=True)

    image_for = models.CharField(max_length=255)
    image = models.ImageField(upload_to=aum_file_path,
                              null=True, blank=True)


class AumFile(models.Model):
    title = models.CharField(max_length=120, blank=True, null=True)
    desc = models.CharField(max_length=512, blank=True, null=True)

    file_for = models.CharField(max_length=255)
    file = models.FileField(upload_to=aum_file_path,
                            null=True, blank=True)
