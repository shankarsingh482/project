class Github {
  constructor() {
    this.client_id = '37cfb6288f29dd1ac21c';
    this.client_secret = '5dacf1665fde403e1be1030747de2e95f6df6932';
	this.repos_count=5;
	this.repos_sort='created:asc';
  }

 async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}