<?php
 
namespace App\Http\Controllers;
 
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
 
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return \Inertia\Inertia::render('Admin/Roles/Index', [
            'roles' => Role::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        Role::create(['name' => $request->name, 'guard_name' => 'web']);

        return Redirect::route('admin.roles')->with('success', 'Role created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id . ',id',
        ]);

        $role->update(['name' => $request->name]);

        return Redirect::route('admin.roles')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role): RedirectResponse
    {
        if ($role->name === 'admin') {
            return Redirect::route('admin.roles')->with('error', 'Cannot delete admin role');
        }

        $role->delete();

        return Redirect::route('admin.roles')->with('success', 'Role deleted successfully.');
    }
}
