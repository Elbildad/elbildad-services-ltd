<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('/contact', function () {
    return view('contact');
});

Route::get('/rfq', function () {
    return view('rfq');
});

Route::post('/rfq/submit', [\App\Http\Controllers\PublicRfqController::class, 'submit'])->name('rfq.submit');
Route::get('/tracking/{token}', [\App\Http\Controllers\TrackingController::class, 'track'])->name('rfq.track');

Route::get('/sourcing-companies', [\App\Http\Controllers\SourcingCompanyController::class, 'index'])->name('sourcing-companies.index');
Route::get('/sourcing-companies/{sourcingCompany}', [\App\Http\Controllers\SourcingCompanyController::class, 'show'])->name('sourcing-companies.show');

Route::get('/signin', function () {
    return Inertia\Inertia::render('Auth/Signin');
})->middleware('guest')->name('login');

Route::get('/signup', function () {
    return Inertia\Inertia::render('Auth/Signup');
})->middleware('guest')->name('register');

// This must be defined AFTER requiring auth.php is overridden
// We register it first so it takes priority over Breeze's forgot-password
Route::get('/forgot-password', function () {
    return Inertia\Inertia::render('Auth/ForgotPassword');
})->middleware('guest')->name('password.request');

require __DIR__.'/auth.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')->group(function () {
        Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('admin.users');
        Route::post('/users', [\App\Http\Controllers\UserController::class, 'store'])->name('admin.users.store');
        Route::put('/users/{user}', [\App\Http\Controllers\UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/users/{user}', [\App\Http\Controllers\UserController::class, 'destroy'])->name('admin.users.destroy');
        
        Route::get('/roles', [\App\Http\Controllers\RoleController::class, 'index'])->name('admin.roles');
        
        Route::post('/roles', [\App\Http\Controllers\RoleController::class, 'store'])->name('admin.roles.store');
        Route::put('/roles/{role:id}', [\App\Http\Controllers\RoleController::class, 'update'])->name('admin.roles.update');
        Route::delete('/roles/{role:id}', [\App\Http\Controllers\RoleController::class, 'destroy'])->name('admin.roles.destroy');

        Route::get('/permissions', [\App\Http\Controllers\PermissionController::class, 'index'])->name('admin.permissions');
        Route::post('/permissions', [\App\Http\Controllers\PermissionController::class, 'store'])->name('admin.permissions.store');
        Route::put('/permissions/{permission:id}', [\App\Http\Controllers\PermissionController::class, 'update'])->name('admin.permissions.update');
        Route::delete('/permissions/{permission:id}', [\App\Http\Controllers\PermissionController::class, 'destroy'])->name('admin.permissions.destroy');

        Route::get('/sourcing-companies', function () {
            $companies = \App\Models\SourcingCompany::all();
            return Inertia\Inertia::render('Admin/SourcingCompanies/Index', ['companies' => $companies]);
        })->name('admin.sourcing-companies');

        Route::post('/sourcing-companies', [\App\Http\Controllers\SourcingCompanyController::class, 'store'])->name('admin.sourcing-companies.store');
        Route::put('/sourcing-companies/{sourcingCompany}', [\App\Http\Controllers\SourcingCompanyController::class, 'update'])->name('admin.sourcing-companies.update');
        Route::delete('/sourcing-companies/{sourcingCompany}', [\App\Http\Controllers\SourcingCompanyController::class, 'destroy'])->name('admin.sourcing-companies.destroy');

        Route::get('/categories', function () {
            $categories = \App\Models\Category::all();
            return Inertia\Inertia::render('Admin/Categories/Index', ['categories' => $categories]);
        })->name('admin.categories');

        Route::post('/categories', [\App\Http\Controllers\CategoryController::class, 'store'])->name('admin.categories.store');
        Route::put('/categories/{category}', [\App\Http\Controllers\CategoryController::class, 'update'])->name('admin.categories.update');
        Route::delete('/categories/{category}', [\App\Http\Controllers\CategoryController::class, 'destroy'])->name('admin.categories.destroy');
        Route::prefix('agent')->middleware('role:agent|super_agent')->group(function () {
            Route::patch('/rfqs/{rfq}/status', [\App\Http\Controllers\AgentRfqController::class, 'updateStatus'])->name('agent.rfqs.update-status');
            Route::patch('/profile', [\App\Http\Controllers\AgentRfqController::class, 'updateProfile'])->name('agent.profile.update');
        });
    });
});
