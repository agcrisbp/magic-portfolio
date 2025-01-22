"use client";

import { useEffect } from "react";

interface CommentsProps {
  postSlug: string;
  postUrl: string;
}

export default function Comments({ postSlug, postUrl }: CommentsProps) {
  useEffect(() => {
    const scriptId = "disqus-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://blog-aghea.disqus.com/embed.js";
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.DISQUS) {
          window.DISQUS.reset({
            reload: true,
            config: function () {
              this.page.identifier = postSlug;
              this.page.url = postUrl;
            },
          });
        }
      };
    } else if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = postSlug;
          this.page.url = postUrl;
        },
      });
    }
  }, [postSlug, postUrl]);

  return <div id="disqus_thread"></div>;
}