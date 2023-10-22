'use client'
import {
  Table as Tble,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text
} from "@chakra-ui/react"

export const Table = ({ tableHeading = [], tableData = [] }) => {
  return (
    <Box>
      <TableContainer
        overflowY="visible"
        overflowX="visible"
        marginBottom='58px'
      >
        <Tble
          border='1px solid'
          borderColor='brand.lighterGray'
          variant='simple'
          css={{
            tableLayout: 'auto',
          }}
        >
          <Thead
            bg='brand.lighterGray'
          >
            <Tr>
              {tableHeading.map((col, i) => {
                return (
                  <Th
                    padding='15px 34px'
                    fontWeight='normal'
                    fontSize='14px'
                    key={`header-${i}`}
                    {...(col.tdStyle || {})}
                    {...(col.thStyle || {})}
                  >
                    <Text>{col.text}</Text>
                  </Th>
                )
              })}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => {
              return (
                <Tr key={index}>
                  {tableHeading.map(col => {
                    return (
                      <Td
                        fontSize='14px'
                        padding='15px 34px'
                        key={col.accessor}
                      >
                        {col.render ? (
                          col.render(row, index)
                        ) : (
                          <Text textTransform='capitalize'>{row[col.accessor]}</Text>
                        )}

                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Tble>
      </TableContainer>
    </Box>
  )
}
