import { Modal, Input, Button, message, Form, Select } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(import.meta.env.VITE_APP_SERVER_URL +"/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla eklendi");
      setIsAddModalOpen(false);
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Bir hata oluştu");
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez" }]}
        >
          <Input placeholder="Ürün adı giriniz" />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[
            { required: true, message: "Ürün Görseli Alanı Boş Geçilemez" },
          ]}
        >
          <Input placeholder="Ürün görseli giriniz" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[
            { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez" },
          ]}
        >
          <Input placeholder="Ürün fiyatı giriniz" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Select
            showSearch
            placeholder="Seçiniz"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
