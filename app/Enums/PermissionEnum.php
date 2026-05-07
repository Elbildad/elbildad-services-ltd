<?php

namespace App\Enums;

enum PermissionEnum: string
{
    case VIEW_RFQS = 'view_rfqs';
    case CREATE_RFQS = 'create_rfqs';
    case ASSIGN_RFQS = 'assign_rfqs';
    case MANAGE_USERS = 'manage_users';
    case MANAGE_CATEGORIES = 'manage_categories';
    case VIEW_DASHBOARD = 'view_dashboard';
}
