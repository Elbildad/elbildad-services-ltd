<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        foreach (PermissionEnum::cases() as $permission) {
            Permission::firstOrCreate(['name' => $permission->value]);
        }

        // Create Roles and Assign Permissions
        
        // Admin / Owner
        $adminRole = Role::firstOrCreate(['name' => RoleEnum::ADMIN->value]);
        $adminRole->givePermissionTo(Permission::all());

        $ownerRole = Role::firstOrCreate(['name' => RoleEnum::OWNER->value]);
        $ownerRole->givePermissionTo(Permission::all());

        // Super Agent
        $superAgentRole = Role::firstOrCreate(['name' => RoleEnum::SUPER_AGENT->value]);
        $superAgentRole->givePermissionTo([
            PermissionEnum::VIEW_RFQS->value,
            PermissionEnum::ASSIGN_RFQS->value,
            PermissionEnum::VIEW_DASHBOARD->value,
        ]);

        // Agent
        $agentRole = Role::firstOrCreate(['name' => RoleEnum::AGENT->value]);
        $agentRole->givePermissionTo([
            PermissionEnum::VIEW_RFQS->value,
            PermissionEnum::VIEW_DASHBOARD->value,
        ]);

        // Customer
        $customerRole = Role::firstOrCreate(['name' => RoleEnum::CUSTOMER->value]);
        $customerRole->givePermissionTo([
            PermissionEnum::CREATE_RFQS->value,
            PermissionEnum::VIEW_DASHBOARD->value,
        ]);

        // Create Sample Users
        $this->createSampleUsers();
    }

    private function createSampleUsers(): void
    {
        $password = bcrypt('password');

        $users = [
            [
                'name' => 'System Admin',
                'email' => 'admin@elbildad.com',
                'whatsapp_number' => '2340000000001',
                'role' => RoleEnum::ADMIN->value,
            ],
            [
                'name' => 'System Owner',
                'email' => 'owner@elbildad.com',
                'whatsapp_number' => '2340000000002',
                'role' => RoleEnum::OWNER->value,
            ],
            [
                'name' => 'Super Agent One',
                'email' => 'superagent@elbildad.com',
                'whatsapp_number' => '2340000000003',
                'role' => RoleEnum::SUPER_AGENT->value,
            ],
            [
                'name' => 'Agent One',
                'email' => 'agent@elbildad.com',
                'whatsapp_number' => '2340000000004',
                'role' => RoleEnum::AGENT->value,
            ],
            [
                'name' => 'Sample Customer',
                'email' => 'customer@elbildad.com',
                'whatsapp_number' => '2340000000005',
                'role' => RoleEnum::CUSTOMER->value,
            ],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'whatsapp_number' => $userData['whatsapp_number'],
                    'password' => $password,
                ]
            );

            $user->syncRoles([$userData['role']]);
        }
    }
}
