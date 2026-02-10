import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  standalone: false,
  templateUrl: './video-embed.component.html',
  styleUrl: './video-embed.component.css',
})
export class VideoEmbedComponent {
  @Input() set url(rawUrl: string) {
    this.safeUrl = this.sanitizeUrl(this.removeAutoplay(rawUrl));
  }

  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  removeAutoplay(url: string): string {
    try {
      const u = new URL(url);
      u.searchParams.delete('autoplay');
      return u.toString();
    } catch {
      return url;
    }
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    const sanitized = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      url,
    );

    return this.sanitizer.bypassSecurityTrustResourceUrl(sanitized || '');
  }
}
