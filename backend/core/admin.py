from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from core.models import AumFile, AumImage
# translation - to automatically change language
# if we change value of the language in setting
# Register your models here.
from core.models import Post, Tag, Image, User


class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users."""
    ordering = ['id']
    list_display = ['email', 'name', 'is_active']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('name',)}),
        (
            _('Permisssions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important dates'), {'fields': ('last_login',)})
    )
    readonly_fields = ['last_login']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email',
                       'password1',
                       'password2',
                       'name',
                       'is_active',
                       'is_staff',
                       'is_superuser',)
        }),
    )


class PostModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'author', 'all_tags', 'published', 'updated_at', 'created_at']
    list_display_links = ['title']
    list_filter = ['updated_at', 'created_at']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

    class Meta:
        model = Post

    def all_tags(self, obj):
        return ",".join([t.name for t in obj.tags.all()])


admin.site.register(User, UserAdmin)
admin.site.register(Post, PostModelAdmin)
admin.site.register(Tag)
admin.site.register(Image)
admin.site.register(AumFile)
admin.site.register(AumImage)
