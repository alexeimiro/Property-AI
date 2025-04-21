# Script to convert TypeScript files to JavaScript
Write-Host "Converting TypeScript files to JavaScript..."

# Create jsconfig.json
$jsconfigContent = @"
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "jsx": "react-jsx"
  }
}
"@
Set-Content -Path "jsconfig.json" -Value $jsconfigContent
Write-Host "Created jsconfig.json"

# Function to convert a file from TS to JS
function ConvertTsToJs {
    param (
        [string]$sourceFile,
        [string]$destFile
    )
    
    $content = Get-Content -Path $sourceFile -Raw
    
    # Copy content as is - in a real scenario, you'd want to strip type annotations
    Set-Content -Path $destFile -Value $content
    
    Write-Host "Converted $sourceFile to $destFile"
}

# Convert .tsx files to .jsx
Get-ChildItem -Path src -Include "*.tsx" -Recurse | ForEach-Object {
    $jsxFile = $_.FullName -replace "\.tsx$", ".jsx"
    ConvertTsToJs -sourceFile $_.FullName -destFile $jsxFile
}

# Convert .ts files to .js
Get-ChildItem -Path src -Include "*.ts" -Recurse -Exclude "*.d.ts" | ForEach-Object {
    $jsFile = $_.FullName -replace "\.ts$", ".js"
    ConvertTsToJs -sourceFile $_.FullName -destFile $jsFile
}

# Update vite config
Copy-Item -Path "vite.config.ts" -Destination "vite.config.js" -Force
Write-Host "Copied vite.config.ts to vite.config.js"

# Fix main.jsx imports
$mainJsxPath = "src\main.jsx"
if (Test-Path $mainJsxPath) {
    $mainContent = Get-Content -Path $mainJsxPath -Raw
    $mainContent = $mainContent -replace "\.tsx", ".jsx"
    Set-Content -Path $mainJsxPath -Value $mainContent
    Write-Host "Updated imports in main.jsx"
}

# Fix App.jsx imports
$appJsxPath = "src\App.jsx"
if (Test-Path $appJsxPath) {
    $appContent = Get-Content -Path $appJsxPath -Raw
    $appContent = $appContent -replace "\.tsx", ".jsx"
    Set-Content -Path $appJsxPath -Value $appContent
    Write-Host "Updated imports in App.jsx"
}

Write-Host "Conversion completed!"
Write-Host "Note: You'll need to manually update imports in other files and fix any TypeScript-specific code." 