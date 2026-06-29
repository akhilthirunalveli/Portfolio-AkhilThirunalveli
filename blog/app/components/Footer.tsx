import Link from "next/link";
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  Envelope,
} from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__accent" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="site-footer__bar">
        <span className="site-footer__copyright">
         Akhil Thirunalveli
        </span>

        <div className="site-footer__links">
          <Link href="/" className="site-footer__link">
            Blog
          </Link>
          <span className="site-footer__divider" aria-hidden="true" />
          <Link href="/about" className="site-footer__link">
            About
          </Link>
          <span className="site-footer__divider" aria-hidden="true" />
          <a
            href="https://github.com/akhilthirunalveli"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            <GithubLogo size={14} weight="bold" /> GitHub
          </a>
          <span className="site-footer__divider" aria-hidden="true" />
          <a
            href="https://linkedin.com/in/akhilthirunalveli"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            <LinkedinLogo size={14} weight="bold" /> LinkedIn
          </a>
          <span className="site-footer__divider" aria-hidden="true" />
          <a
            href="https://x.com/archivebyakhil"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            <XLogo size={14} weight="bold" /> X
          </a>
          <span className="site-footer__divider" aria-hidden="true" />
          <a
            href="mailto:work.akhilthirunalveli@gmail.com"
            className="site-footer__link"
          >
            <Envelope size={14} weight="bold" /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}
