<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\BlogPostsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ProjectsController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\SkillsController;
use App\Http\Controllers\Admin\TestimonialsController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\BlogController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ProjectsController as PublicProjectsController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/projects', [PublicProjectsController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [PublicProjectsController::class, 'show'])->name('projects.show');
Route::get('/about', AboutController::class)->name('about');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/contact', [ContactController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:10,1')->name('contact.store');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AdminAuthController::class, 'login'])->middleware('throttle:5,1')->name('login.store');
    });

    Route::post('/logout', [AdminAuthController::class, 'logout'])->middleware('auth')->name('logout');

    Route::middleware(['auth', 'role_or_permission:admin|editor'])->group(function () {
        Route::get('/dashboard', DashboardController::class)->name('dashboard');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::resource('projects', ProjectsController::class)->except(['show']);
        Route::resource('skills', SkillsController::class)->except(['show']);
        Route::resource('experience', ExperienceController::class)->except(['show']);
        Route::resource('education', EducationController::class)->except(['show']);
        Route::resource('blog', BlogPostsController::class)->except(['show'])->parameters(['blog' => 'blog']);
        Route::resource('testimonials', TestimonialsController::class)->except(['show']);

        Route::get('/messages', [MessagesController::class, 'index'])->name('messages.index');
        Route::patch('/messages/{message}', [MessagesController::class, 'update'])->name('messages.update');

        Route::get('/settings', [SettingsController::class, 'edit'])->name('settings.edit');
        Route::put('/settings', [SettingsController::class, 'update'])->name('settings.update');
    });
});
