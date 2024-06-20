import { Form, Input, Button, Carousel, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useState } from "react";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_APP_SERVER_URL +"/api/auths/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();
      if (res.status === 200) {
        console.log(user);
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi başarılı");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı");
      } else if (res.status === 403) {
        message.error("Bilgileriniz hatalı!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Bir hata oluştu");
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 w-full px-10 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl mb-2 font-bold">Logo</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="E-Posta"
              name={"email"}
              rules={[{ required: true, message: "EMail zorunludur" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[{ required: true, message: "Parola zorunludur" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Beni Hatırla</Checkbox>
                <Link>Şifremi Unuttum</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu? &nbsp;
            <Link to="/register" className="text-blue-600">
              Kayıt ol
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="İstatistikler"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Müşteri Memnuniyeti"
                  desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Yönetici Paneli"
                  desc="Tek Yerden Yönetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
