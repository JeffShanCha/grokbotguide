// GA4 的 gtag 由 astro.config.mjs 在 <head> 里注入；没配置衡量 ID 时不存在
interface Window {
	gtag?: (...args: unknown[]) => void;
}
