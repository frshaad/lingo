'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP':
        if (metric.rating !== 'good') {
          console.log(
            `⚠️ FCP is ${metric.rating}: ${metric.value.toFixed(0)} ms`,
          );
        }
        break;

      case 'TTFB':
        if (metric.rating !== 'good') {
          console.log(
            `⚠️ TTFB is ${metric.rating}: ${metric.value.toFixed(0)} ms`,
          );
        }
        break;

      case 'LCP':
        if (metric.rating !== 'good') {
          console.log(
            `⚠️ LCP is ${metric.rating}: ${metric.value.toFixed(0)} ms`,
          );
        }
        break;

      case 'FID':
        if (metric.rating !== 'good') {
          console.log(
            `⚠️ FID is ${metric.rating}: ${metric.value.toFixed(0)} ms`,
          );
        }
        break;

      case 'CLS':
        if (metric.rating !== 'good') {
          console.log(
            `⚠️ CLS is ${metric.rating}: ${metric.value.toFixed(0)} ms`,
          );
        }
        break;

      case 'INP':
        if (metric.rating !== 'good') {
          console.log(
            `⚠️ INP is ${metric.rating}: ${metric.value.toFixed(0)} ms`,
          );
        }
        break;

      default:
        break;
    }
  });

  return null;
}
