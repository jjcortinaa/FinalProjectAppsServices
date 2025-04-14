import Layout from "../../components/Layout";
import SubastaForm from "../../components/SubastaForm";

export default function EditarSubastaPage({ params }) {
  const { id } = params;
  return (
    <Layout>
      <h1>Editar Subasta</h1>
      <SubastaForm id={id} />
    </Layout>
  );
}
