import Link from "next/link";
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  Envelope,
  ArrowUp,
} from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__accent" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="site-footer__grid">
        <div className="site-footer__col">
          <h4 className="site-footer__heading">Navigation</h4>
          <Link href="/" className="site-footer__link">
            Blog
          </Link>
          <Link href="/about" className="site-footer__link">
            About
          </Link>
        </div>

        <div className="site-footer__col">
          <h4 className="site-footer__heading">Connect</h4>
          <a
            href="https://github.com/akhilthirunalveli"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            <GithubLogo size={16} weight="bold" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/akhilthirunalveli"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            <LinkedinLogo size={16} weight="bold" /> LinkedIn
          </a>
          <a
            href="https://x.com/archivebyakhil"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            <XLogo size={16} weight="bold" /> X (Twitter)
          </a>
          <a
            href="mailto:work.akhilthirunalveli@gmail.com"
            className="site-footer__link"
          >
            <Envelope size={16} weight="bold" /> Email
          </a>
        </div>

        <div className="site-footer__col">
          <h4 className="site-footer__heading">Newsletter</h4>
          <p className="site-footer__text">
            Get new articles delivered to your inbox. Written thoughtfully, sent
            rarely.
          </p>
        </div>
      </div>

    </footer>
  );
}
