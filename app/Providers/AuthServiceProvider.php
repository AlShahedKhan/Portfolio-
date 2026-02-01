<?php

namespace App\Providers;

use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Policies\ManageContentPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Profile::class => ManageContentPolicy::class,
        Project::class => ManageContentPolicy::class,
        Skill::class => ManageContentPolicy::class,
        Experience::class => ManageContentPolicy::class,
        Education::class => ManageContentPolicy::class,
        BlogPost::class => ManageContentPolicy::class,
        Testimonial::class => ManageContentPolicy::class,
        ContactMessage::class => ManageContentPolicy::class,
        Setting::class => ManageContentPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::before(function ($user) {
            return $user->hasRole('admin') ? true : null;
        });
    }
}
