import { RepoPage } from "../models/repo.page";
import CustomerService, { QueryParams } from "./RepositoriesService";


describe('RepositoriesService', () => {
  const mockRepoPage: RepoPage = {
    items: [
      {
        id: '123',
        node_id: '123',
        name: 'test-repo',
        full_name: 'test/repo',
        private: false,
        description: 'test description',
        html_url: 'https://github.com/test/repo',
        language: 'JavaScript'
      }
    ],
    total_count: 1,
    incomplete_results: false
  };

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockRepoPage),
    })
    ) as unknown as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch repositories with default parameters', async () => {
    const queryParams: QueryParams = {
        query: 'created:>2023-02-20',
        page: ""
    };
    const expectedUrl = `http://localhost:3000/api/search?q=${queryParams.query}&sort=stars&order=desc&proPage=20&page=1`;
    const result = await CustomerService.getAllRepos(queryParams);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockRepoPage);
  });

  it('should fetch repositories with custom parameters', async () => {
    const queryParams: QueryParams = {
      query: 'created:>2023-02-20',
      sort: 'forks',
      order: 'asc',
      proPage: 50,
      page: 2
    };
    const expectedUrl = `http://localhost:3000/api/search?q=${queryParams.query}&sort=${queryParams.sort}&order=${queryParams.order}&proPage=${queryParams.proPage}&page=${queryParams.page}`;
    const result = await CustomerService.getAllRepos(queryParams);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockRepoPage);
  });
});