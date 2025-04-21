# Script to remove TypeScript files
Write-Host "Removing TypeScript files..."

# Delete all .tsx files
Get-ChildItem -Path src -Include "*.tsx" -Recurse | ForEach-Object {
    Remove-Item -Path $_.FullName -Force
    Write-Host "Deleted $($_.FullName)"
}

# Delete all .ts files (except d.ts files which might be needed for some libs)
Get-ChildItem -Path src -Include "*.ts" -Recurse -Exclude "*.d.ts" | ForEach-Object {
    Remove-Item -Path $_.FullName -Force
    Write-Host "Deleted $($_.FullName)"
}

# Delete TypeScript config files
$tsConfigFiles = @(
    "tsconfig.json",
    "tsconfig.node.json",
    "tsconfig.app.json",
    "tailwind.config.ts"
)

foreach ($file in $tsConfigFiles) {
    if (Test-Path $file) {
        Remove-Item -Path $file -Force
        Write-Host "Deleted $file"
    }
}

Write-Host "TypeScript files removed!" 