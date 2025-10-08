import { calculatePasswordStrength, getStrengthLabel } from "../../utils/validateOrderForm";

export const PasswordStrengthBar = ({ password, className }: { password: string; className: string }) => {
  const score = calculatePasswordStrength(password);
  const label = getStrengthLabel(score);
  const color = score <= 2 ? "red" : score <= 4 ? "orange" : "green";
  return (
    <div className={className}>
      <div style={{ background: "#eee", height: 8, borderRadius: 4 }}>
        <div style={{ width: `${(score / 5) * 100}%`, background: color, height: "100%", borderRadius: 4 }} />
      </div>
      <p style={{ color }}>{label}</p>
    </div>
  );
};
