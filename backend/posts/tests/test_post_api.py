from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient
from django.utils import timezone, dateformat
from django.db.models import Q

from core.models import Post
from post.serializers import (
    PostSerializer,
    PostDetailSerializer,
)

POSTS_URL = reverse('post:post-list')


def detail_url(post_id):
    """Create and return a post detail URL."""
    return reverse('post:post-detail', args=[post_id])


def create_post(user, **params):
    """Create and return a sample post"""
    defaults = {
        'title': 'Sample post title',
        'content': 'Sample content',
        'published_date': timezone.now(),
    }
    defaults.update(params)

    post = Post.objects.create(user=user, **defaults)
    return post


def create_user(email='user@example.com',
                password='test123', **params):
    """Create and return a new user"""
    return get_user_model().objects.create_user(email, password, **params)


class PublicPostAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()
        self.client.force_authenticate(self.user)

    def test_auth_not_required_to_get(self):
        """Test auth is not required to GET API"""
        create_post(self.user)
        create_post(self.user, published_date=None)
        post = Post.objects.all().filter(~Q(published_date=None))

        res = self.client.get(POSTS_URL)
        self.assertEqual(len(res.data), post.count())
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_auth_required_to_post(self):
        """Test auth is required to POST API"""
        payload = {
            'title': 'Sample post title',
            'content': 'Sample content',
        }
        res = self.client.post(POSTS_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivatePostAPITests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()

        self.client.force_authenticate(self.user)

    def test_posts_list_limited_to_user(self):
        """Test list of posts is limited to authenticated user."""
        other_user = create_user(
            email='other@example.com',
            password='test123'
        )
        create_post(user=other_user, published_date=timezone.now())
        create_post(user=self.user, published_date=timezone.now())
        create_post(user=self.user)

        res = self.client.get(POSTS_URL)
        posts = Post.objects.filter(user=self.user)\
            | Post.objects.filter(~Q(published_date=None))
        serializer = PostSerializer(posts.order_by('-id'), many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), posts.count())
        self.assertEqual(res.data, serializer.data)

    # def test_get_post_detail(self):
    #     """Test get post detail"""
    #     post = create_post(user=self.user)

    #     url = detail_url(post.id)
    #     res = self.client.get(url)

    #     serializer = PostDetailSerializer(post)
    #     self.assertEqual(res.data, serializer.data)
