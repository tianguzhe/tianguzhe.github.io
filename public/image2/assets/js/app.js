// Entry point: called once, after every dependency and the document have loaded.
async function initializeApp() {
  initSettings();
  initGallery();
  initEditor();
  initChat();

  window.addEventListener('beforeunload', () => {
    blobUrlCache.forEach(url => URL.revokeObjectURL(url));
    blobUrlCache.clear();
    if (streamObjectUrl) URL.revokeObjectURL(streamObjectUrl);
    if (chatPartialUrl) URL.revokeObjectURL(chatPartialUrl);
  });

  await migrateFromLocalStorage();
  await loadDirHandle();
  if (FS_SUPPORTED) document.getElementById('fsDirBtn').style.display = '';
  updateFsUI();
  await renderGallery();
}

initializeApp().catch(error => {
  console.error('Application initialization failed:', error);
  showError('初始化失敗，請重新整理頁面');
});
