// *[_type == "county" && name == 'Avon']{...,"companies": *[_type == "company" && references(^._id)]{...}}

export default function County() {
  return <p>wheee</p>
}
