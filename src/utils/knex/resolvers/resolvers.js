const { isEmpty, first, divide } = require("lodash");
const { queryFactory } = require("../resources");
const { makeSingleName, parsePagination } = require("../utils");

const makeSingleResolver = resourceConfig => {
  return (root, { id }, { services }) => {
    const query = queryFactory(services.db, resourceConfig);

    return query
      .where({ id })
      .first()
      .then(result => {
        return isEmpty(result)
          ? Promise.reject(new Error("registry not found"))
          : result;
      });
  };
};

const makeListResolver = resourceConfig => {
  const __type = makeSingleName(resourceConfig.resource);
  return (root, args, context) => {
    return {
      base_args: args,
      __type
    };
  };
};

const makeRecordsResolver = resourceConfig => {
  return (root, args, { services }) => {
    const { pagination, filters, ordination } = root.base_args;
    const query = queryFactory(
      services.db,
      resourceConfig,
      filters,
      pagination,
      ordination
    );

    return query;
  };
};

const makePaginationResolver = resourceConfig => {
  return (root, args, { services }) => {
    const { pagination, filters } = root.base_args;
    const { limit, page } = parsePagination(pagination);

    const base = {
      per_page: limit,
      current_page: page
    };

    const query = queryFactory(services.db, resourceConfig, filters, {});

    return query
      .count("* as count")
      .then(result => first(result))
      .then(({ count }) => {
        const pages = divide(count, limit);

        return {
          ...base,
          total_pages: Math.ceil(pages),
          total_records: count
        };
      });
  };
};

const makeResourceResolver = resourceConfig => {
  return {
    pagination: makePaginationResolver(resourceConfig),
    records: makeRecordsResolver(resourceConfig)
  };
};

module.exports = {
  makeSingleResolver,
  makeListResolver,
  makeResourceResolver
};
