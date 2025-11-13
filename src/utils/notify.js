export function notify(t, m) {
  window.dispatchEvent(
    new CustomEvent('afya:note', { detail: { title: t, message: m } }),
  );
}
