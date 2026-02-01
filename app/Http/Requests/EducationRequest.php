<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'school' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:50'],
            'details' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
