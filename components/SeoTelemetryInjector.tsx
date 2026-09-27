import React from "react";
import { getSeoSettings } from "@/lib/db";
import Script from "next/script";

export default async function SeoTelemetryInjector() {
  const seo = await getSeoSettings();
  if (!seo) return null;

  const orgSchema = seo.organizationSchema ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seo.organizationSchema.name,
    "url": seo.organizationSchema.url,
    "logo": seo.organizationSchema.logo,
    "telephone": seo.organizationSchema.telephone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": seo.organizationSchema.addressLocality,
      "addressCountry": seo.organizationSchema.addressCountry
    },
    "sameAs": seo.organizationSchema.sameAs || []
  } : null;

  return (
    <>
      {/* Site Verification Meta Tags */}
      {seo.googleSiteVerification && (
        <meta name="google-site-verification" content={seo.googleSiteVerification} />
      )}
      {seo.bingSiteVerification && (
        <meta name="msvalidate.01" content={seo.bingSiteVerification} />
      )}
      {seo.yandexVerification && (
        <meta name="yandex-verification" content={seo.yandexVerification} />
      )}
      {seo.pinterestVerification && (
        <meta name="p:domain_verify" content={seo.pinterestVerification} />
      )}

      {/* Meta & OpenGraph */}
      {seo.keywords?.en && <meta name="keywords" content={seo.keywords.en} />}
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      {seo.twitterHandle && <meta name="twitter:site" content={seo.twitterHandle} />}
      {!seo.enableSearchIndexing && <meta name="robots" content="noindex, nofollow" />}

      {/* Structured Data: Schema.org Organization */}
      {orgSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      )}

      {/* Structured Data: Custom JSON-LD */}
      {seo.customJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.customJsonLd }}
        />
      )}

      {/* Google Analytics 4 (GA4) */}
      {seo.ga4MeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${seo.ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${seo.ga4MeasurementId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager (GTM) Header Script */}
      {seo.gtmContainerId && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${seo.gtmContainerId}');
          `}
        </Script>
      )}

      {/* Meta (Facebook) Pixel Script */}
      {seo.facebookPixelId && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${seo.facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* TikTok Pixel Script */}
      {seo.tiktokPixelId && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${seo.tiktokPixelId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* Custom Raw Head Scripts */}
      {seo.customHeadScripts && (
        <div dangerouslySetInnerHTML={{ __html: seo.customHeadScripts }} />
      )}
    </>
  );
}
