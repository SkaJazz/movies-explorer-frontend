import "./Section.css";

export default function Section({ className, children }) {
  return <section className={`section ${className}`}>{children}</section>;
}
