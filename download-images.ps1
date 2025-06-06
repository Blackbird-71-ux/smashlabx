# Create images directory if it doesn't exist
if (-not (Test-Path "images")) {
    New-Item -ItemType Directory -Path "images"
}

# Image URLs and their corresponding filenames
$images = @{
    "hero-bg.jpg" = "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
    "stress-relief.jpg" = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21"
    "team-building.jpg" = "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    "wellness.jpg" = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
    "corporate.jpg" = "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    "arrival.jpg" = "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
    "release.jpg" = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21"
    "recovery.jpg" = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
    "integration.jpg" = "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    "team-package.jpg" = "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    "corporate-package.jpg" = "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    "enterprise-package.jpg" = "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
    "testimonial1.jpg" = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
    "testimonial2.jpg" = "https://images.unsplash.com/photo-1560250097-0b93528c311a"
    "cta-bg.jpg" = "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
}

# Download each image
foreach ($image in $images.GetEnumerator()) {
    $outputPath = Join-Path "images" $image.Key
    Write-Host "Downloading $($image.Key)..."
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
    Write-Host "Downloaded $($image.Key)"
}

Write-Host "All images downloaded successfully!" 