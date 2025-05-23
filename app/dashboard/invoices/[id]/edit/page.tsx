import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchCustomers } from "@/app/lib/data"
import { fetchInvoiceById } from "@/app/lib/data"
import Form from "@/app/ui/invoices/edit-form"
import { notFound } from "next/navigation"
export default async function Page({ params }: { params: { id: string } }) {
  const {id} = params

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          { label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true },
        ]}
      />
      <Form customers={customers} invoice={invoice} />
    </main>
  )
}