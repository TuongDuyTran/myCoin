function Home({ infoAccount }) {
  return (
    <main className="layout-main">
      <h2>Welcome to myCoin</h2>
      <h2>Hi, {infoAccount.name}</h2>
    </main>
  );
}

export default Home;
