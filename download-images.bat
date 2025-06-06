@echo off
mkdir images 2>nul

echo Downloading images...

curl -L "https://images.unsplash.com/photo-1497366754035-f200968a6e72" -o "images/hero-bg.jpg"
curl -L "https://images.unsplash.com/photo-1573497620053-ea5300f94f21" -o "images/stress-relief.jpg"
curl -L "https://images.unsplash.com/photo-1522071820081-009f0129c71c" -o "images/team-building.jpg"
curl -L "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" -o "images/wellness.jpg"
curl -L "https://images.unsplash.com/photo-1497366811353-6870744d04b2" -o "images/corporate.jpg"
curl -L "https://images.unsplash.com/photo-1497366754035-f200968a6e72" -o "images/arrival.jpg"
curl -L "https://images.unsplash.com/photo-1573497620053-ea5300f94f21" -o "images/release.jpg"
curl -L "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" -o "images/recovery.jpg"
curl -L "https://images.unsplash.com/photo-1522071820081-009f0129c71c" -o "images/integration.jpg"
curl -L "https://images.unsplash.com/photo-1522071820081-009f0129c71c" -o "images/team-package.jpg"
curl -L "https://images.unsplash.com/photo-1497366811353-6870744d04b2" -o "images/corporate-package.jpg"
curl -L "https://images.unsplash.com/photo-1497366754035-f200968a6e72" -o "images/enterprise-package.jpg"
curl -L "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e" -o "images/testimonial1.jpg"
curl -L "https://images.unsplash.com/photo-1560250097-0b93528c311a" -o "images/testimonial2.jpg"
curl -L "https://images.unsplash.com/photo-1497366811353-6870744d04b2" -o "images/cta-bg.jpg"

REM Download new images for SmashLabs Experience section
curl -L -o images/arrival-briefing.jpg "https://images.unsplash.com/photo-2zDXqgTzEFE?auto=format&fit=crop&w=800&q=80"
curl -L -o images/cathartic-release.jpg "https://images.unsplash.com/photo-8manzosRGPE?auto=format&fit=crop&w=800&q=80"
curl -L -o images/mindful-recovery.jpg "https://images.unsplash.com/photo-0Zx1bDv5BNY?auto=format&fit=crop&w=800&q=80"
curl -L -o images/team-integration.jpg "https://images.unsplash.com/photo-5QgIuuBxKwM?auto=format&fit=crop&w=800&q=80"

REM --- SmashLabs Cool Room Images ---
curl -L -o images/hero-neon.jpg "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80"
curl -L -o images/why-sledgehammer.jpg "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80"
curl -L -o images/why-group-fun.jpg "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80"
curl -L -o images/why-neon-props.jpg "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
curl -L -o images/arrival-funky.jpg "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
curl -L -o images/smash-action.jpg "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
curl -L -o images/chill-lounge.jpg "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
curl -L -o images/repeat-celebrate.jpg "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80"
curl -L -o images/package-group.jpg "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80"
curl -L -o images/testimonial-victory.jpg "https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=900&q=80"
curl -L -o images/cta-neon.jpg "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=900&q=80"

echo All images downloaded successfully!
pause 