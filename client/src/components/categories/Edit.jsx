import { Modal, Form, Table, Button, Input, message } from "antd";
import { useState } from "react";

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories ,setCategories}) => {
  const [editingRow, setEditingRow] = useState([]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(import.meta.env.VITE_APP_SERVER_URL +"/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarıyla güncellendi");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
      message.error("Bir hata oluştu");
    }
  };

  const DeleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(import.meta.env.VITE_APP_SERVER_URL +"/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi");
        setCategories(categories.filter((item) => item._id !== id));
        setIsEditModalOpen(false);
      } catch (error) {
        console.log(error);
        message.error("Bir hata oluştu");
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "İşlemler",
      dataIndex: "işlemler",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-green-700">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              onClick={() => DeleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori Düzenle"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form vertical="layout" onFinish={onFinish} form={form}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKet={"_id"}
        ></Table>
      </Form>
    </Modal>
  );
};

export default Edit;
