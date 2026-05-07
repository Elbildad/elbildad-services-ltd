<?php
 
namespace App\Http\Controllers;
 
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
 
class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);
 
        Permission::create(['name' => $request->name, 'guard_name' => 'web']);
 
        return Redirect::route('admin.permissions')->with('success', 'Permission created successfully.');
    }
 
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id . ',id',
        ]);
 
        $permission->update(['name' => $request->name]);
 
        return Redirect::route('admin.permissions')->with('success', 'Permission updated successfully.');
    }
 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();
 
        return Redirect::route('admin.permissions')->with('success', 'Permission deleted successfully.');
    }
}
