<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Profile extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'title',
        'tagline',
        'bio',
        'location',
        'email',
        'phone',
        'resume_url',
        'socials_json',
        'meta_json',
    ];

    protected $casts = [
        'socials_json' => 'array',
        'meta_json' => 'array',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('hero')->singleFile();
    }
}
