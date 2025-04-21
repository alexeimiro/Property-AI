# Script to update import statements in JS/JSX files
Write-Host "Updating import statements in JS/JSX files..."

# Get all JS and JSX files
$files = Get-ChildItem -Path src -Include "*.js","*.jsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace .tsx with .jsx in imports
    $updatedContent = $content -replace '\.tsx', '.jsx'
    
    # Replace .ts with .js in imports
    $updatedContent = $updatedContent -replace '\.ts', '.js'
    
    # Update the file
    if ($content -ne $updatedContent) {
        Set-Content -Path $file.FullName -Value $updatedContent
        Write-Host "Updated imports in $($file.FullName)"
    }
}

Write-Host "Import updates completed!"