<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }} - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-100">
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <aside class="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
            <div class="p-6">
                <h1 class="text-2xl font-bold">Elbildad</h1>
            </div>
            <nav class="flex-1 px-4 space-y-2">
                <a href="{{ route('dashboard') }}" class="block px-4 py-2 rounded-lg bg-slate-800">Dashboard</a>
                
                @role('admin|owner')
                    <a href="#" class="block px-4 py-2 rounded-lg hover:bg-slate-800">All RFQs</a>
                    <a href="#" class="block px-4 py-2 rounded-lg hover:bg-slate-800">Agents</a>
                    <a href="{{ route('sourcing-companies.index') }}" class="block px-4 py-2 rounded-lg hover:bg-slate-800">Sourcing Companies</a>
                @endrole

                @role('agent|super_agent')
                    <a href="#" class="block px-4 py-2 rounded-lg hover:bg-slate-800">Assigned RFQs</a>
                @endrole

                @role('customer')
                    <a href="{{ url('/rfq') }}" class="block px-4 py-2 rounded-lg hover:bg-slate-800">Submit RFQ</a>
                    <a href="#" class="block px-4 py-2 rounded-lg hover:bg-slate-800">My Requests</a>
                @endrole
            </nav>
            <div class="p-4 border-t border-slate-800">
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full text-left px-4 py-2 text-gray-400 hover:text-white">Logout</button>
                </form>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <header class="bg-white border-b h-16 flex items-center justify-between px-8">
                <h2 class="text-xl font-semibold text-gray-800">@yield('title', 'Dashboard')</h2>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600">{{ Auth::user()->name }} ({{ Auth::user()->getRoleNames()->first() }})</span>
                </div>
            </header>

            <!-- Content Area -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto p-8">
                @if(session('success'))
                    <div class="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                        {{ session('success') }}
                    </div>
                @endif
                @yield('content')
            </main>
        </div>
    </div>
</body>
</html>
