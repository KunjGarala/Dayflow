import Section from "../../components/Section";
import Card from "../../components/Card";
import Tag from "../../components/Tag";
import AddButton from "../../components/AddButton";

const ResumeTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT SIDE – ABOUT */}
      <div className="lg:col-span-2 bg-white border rounded-lg p-6">
        {/* About */}
        <Section
          title="About"
          editable
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        />

        {/* Love About Job */}
        <Section
          title="What I love about my job"
          editable
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries."
        />

        {/* Interests */}
        <Section
          title="Interests and hobbies"
          editable
          content="Reading, coding, travelling, problem solving."
        />
      </div>

      {/* RIGHT SIDE – SKILLS & CERTIFICATIONS */}
      <div className="space-y-6">

        {/* Skills */}
        <Card title="Skills">
          <Tag text="React" />
          <Tag text="Node.js" />
          <Tag text="MongoDB" />
          <AddButton />
        </Card>

        {/* Certifications */}
        <Card title="Certifications">
          <Tag text="AWS Cloud Practitioneriol" />
          <Tag text="NPTEL – DSA" />
          <AddButton />
        </Card>

      </div>
    </div>
  );
};

export default ResumeTab;
