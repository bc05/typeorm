import "reflect-metadata";
import {Connection} from "../../../../src";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../../../test/utils/test-utils";

describe("persistence > bulk-insert-remove-optimization", function() {

    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------

    let connections: Connection[];
    beforeAll(async () => connections = await createTestingConnections({ __dirname }));
    beforeEach(() => reloadTestingDatabases(connections));
    afterAll(() => closeTestingConnections(connections));

    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------

    test("should group multiple insert and remove queries", () => Promise.all(connections.map(async connection => {

        const category1 = new Category();
        category1.name = "cat#1";

        const category2 = new Category();
        category2.name = "cat#2";

        const post = new Post();
        post.title = "about post";
        post.categories = [category1, category2];

        await connection.manager.save(post);

        await connection.manager.remove([post, category2, category1]);

        // todo: finish test, e.g. check actual queries
    })));

});