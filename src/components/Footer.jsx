export default function Footer({ disclaimer }) {
  return (
    <footer className="site-footer">
      <div>
        <p className="lang-en">Shri Khandoba Divya Darbar</p>
        <p className="lang-mr">श्री खंडोबा दिव्य दरबार</p>
        <small>{disclaimer}</small>
      </div>

      <a href="#top" className="btn ghost lang-en">
        Back to Top
      </a>
      <a href="#top" className="btn ghost lang-mr">
        वर जा
      </a>
    </footer>
  );
}
