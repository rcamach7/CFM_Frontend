import { useRouter } from 'next/router';

const preventDefault = (f) => (e) => {
  e.preventDefault();
  f(e);
};

export default function ContactPage() {
  const router = useRouter();

  const handleSubmit = preventDefault(() => {
    const form = document.getElementById('chooseMessage');
    const data = new FormData(form);
    let key,
      value = '';
    for (const entry of data) {
      [key, value] = entry;
    }

    router.push({
      pathname: '/feedback',
      query: { type: value },
    });
  });

  return (
    <form id="chooseMessage" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Select feedback message:</legend>

        <div>
          <input
            type="radio"
            id="EmailSuccess"
            name="type"
            value="EmailSuccess"
            defaultChecked
          />
          <label htmlFor="EmailSuccess">Email Success</label>
        </div>

        <div>
          <input type="radio" id="EmailError" name="type" value="EmailError" />
          <label htmlFor="EmailError">Email Error</label>
        </div>

        <div>
          <input
            type="radio"
            id="CreateFridge"
            name="type"
            value="CreateFridge"
          />
          <label htmlFor="CreateFridge">Create Fridge</label>
        </div>

        <div>
          <input
            type="radio"
            id="StatusUpdate"
            name="type"
            value="StatusUpdate"
          />
          <label htmlFor="StatusUpdate">Status Update</label>
        </div>
      </fieldset>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
