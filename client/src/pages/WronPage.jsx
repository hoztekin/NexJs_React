import { Button, Result } from "antd";
import { Link } from "react-router-dom";
function WronPage() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Aradığınız sayfa bulunamadı."
        extra={
          <Link to="/">
            <Button type="primary">Ana Sayfa</Button>
          </Link>
        }
      />
    </div>
  );
}

export default WronPage;
