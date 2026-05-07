<?php

namespace App\Enums;

enum RoleEnum: string
{
    case CUSTOMER = 'customer';
    case AGENT = 'agent';
    case SUPER_AGENT = 'super_agent';
    case OWNER = 'owner';
    case ADMIN = 'admin';
}
