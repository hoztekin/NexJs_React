import { Modal, Form, Input, Select, Button, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_APP_SERVER_URL + "/api/bills/add-bill",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            subTotal: cart.total,
            tax: ((cart.total * cart.tax) / 100).toFixed(2),
            totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(
              2
            ),
            cardItems: cart.cartItems,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.status === 200) {
        message.success("Fatura oluşturuldu");
        dispatch(reset());
        navigate("/bills");
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error("Bir hata oluştu");
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Fatura Oluştur"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout={"vertical"} onFinish={onFinish}>
          <Form.Item
            label="Müşteri Adı"
            name={"customerName"}
            rules={[
              { required: true, message: "Müşteri Adı alanı boş geçilemez" },
            ]}
          >
            <Input placeholder="Müşteri Adı yazınız" />
          </Form.Item>
          <Form.Item
            label="Telefon Numarası"
            name={"phoneNumber"}
            rules={[
              {
                required: true,
                message: "Telefon numarası alanı boş geçilemez",
              },
            ]}
          >
            <Input placeholder="5322222222" maxLength={11} />
          </Form.Item>
          <Form.Item
            label="Ödeme Tipi"
            name={"paymentMode"}
            rules={[
              { required: true, message: "Ödeme Yöntemi alanı boş geçilemez" },
            ]}
          >
            <Select placeholder="Seçiniz">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Karti">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>
          <Card className="">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV % {cart.tax}</span>
              <span className="text-red-700">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b className="text-xl text-green-500">Genel Toplam</b>
              <span className="text-xl">
                {" "}
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-end">
              <Button
                className="mt-4"
                type="primary"
                onClick={() => {
                  setIsModalOpen(true);
                }}
                htmlType="submit"
              >
                Fatura Oluştur
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateBill;
