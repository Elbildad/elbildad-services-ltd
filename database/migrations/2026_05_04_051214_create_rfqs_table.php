<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rfqs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('category_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignUuid('assigned_agent_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('product_name');
            $table->text('specifications');
            $table->text('additional_requirements')->nullable();
            $table->string('quantity'); // From QuantityEnum
            $table->string('delivery_method'); // From DeliveryMethodEnum
            $table->string('target_price')->nullable();
            $table->string('location')->nullable();
            $table->string('company_name')->nullable();
            $table->string('status')->default('pending'); // From RfqStatusEnum
            $table->uuid('tracking_token')->unique();
            $table->text('ai_summary')->nullable();
            $table->json('ai_suppliers')->nullable();
            $table->json('internal_matches')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rfqs');
    }
};
