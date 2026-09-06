@echo off
chcp 65001 >nul
echo ===========================================================
echo  Poh-Chang Fine Art Exhibition - Batch Artworks Importer
echo ===========================================================
echo.
echo Importing artworks from sample_import/...
echo.
node scripts\import_gallery_batch.mjs --csv "sample_import\artwork_list.csv" --artists-dir "sample_import\folder_artists" --artworks-dir "sample_import\folder_artworks" --status approved
echo.
echo Import completed! Refresh your browser at http://localhost:8787/gallery.html
pause
