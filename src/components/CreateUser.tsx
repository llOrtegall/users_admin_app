function CreateNewUser () {
  return (
    <div>
      <h1>Create New User</h1>
      <form>
        <label>
          Name:
          <input type="text" />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateNewUser;
