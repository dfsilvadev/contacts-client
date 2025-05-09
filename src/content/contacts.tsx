import { CaretLeft, CaretRight } from "phosphor-react";

import { Button, Header, Table } from "@/components";

const ContactsContent = () => {
  const contacts = [
    {
      id: "da51ffdb-82b0-433b-a2a4-56968959a0a5",
      name: "Flávia Silva",
      email: "fsilva@email.com",
      phone: "1199718699",
      categoryId: "5e373bd5-76a3-4b61-9d64-83d77ceaa2ed",
      createdAt: "2025-05-07T18:38:45.406Z",
      categoryLabel: "family",
      updatedAt: null,
    },
    {
      id: "43f7dd06-693e-4d2b-b0a3-b7811ecde187",
      name: "Henrique Lima",
      email: "hlima@email.com",
      phone: "11923475661",
      categoryId: "3515a90f-6c11-433c-87f4-e668153035fc",
      createdAt: "2025-05-07T18:38:45.406Z",
      categoryLabel: "friend",
      updatedAt: null,
    },
    {
      id: "4a22b461-76f5-449b-bcd9-9eacec05b49b",
      name: "Daniel Silva",
      email: "dfsilva@email.com",
      phone: "11983804055",
      categoryId: "7e688b12-495a-4c9f-b427-1599f19718ef",
      createdAt: "2025-05-07T18:38:45.406Z",
      categoryLabel: "personal",
      updatedAt: null,
    },
  ];

  return (
    <section className="mx-auto max-w-4xl p-4">
      {/* <Header /> */}
      <Header />

      {/* <Table /> */}
      <Table {...{ contacts }} />

      {/* <Pagination /> */}
      <footer>
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-gray-400">1 a 10 de 50 contatos</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>
              <CaretLeft size={10} />
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              <CaretRight size={10} />
            </Button>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactsContent;
