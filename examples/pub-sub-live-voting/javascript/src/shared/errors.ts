let bannerEl: HTMLElement | null = null;

function getBanner(): HTMLElement {
  if (bannerEl) return bannerEl;
  bannerEl = document.createElement('div');
  bannerEl.className = 'error-banner hidden';
  document.body.prepend(bannerEl);
  return bannerEl;
}

export function showError(message: string) {
  const banner = getBanner();
  banner.textContent = message;
  banner.classList.remove('hidden');
  console.error(message);
}

export function clearError() {
  if (bannerEl) {
    bannerEl.classList.add('hidden');
  }
}
