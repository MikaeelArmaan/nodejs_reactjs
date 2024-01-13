import React, { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import { Menu, Checkbox, Tooltip } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { connect } from 'react-redux';
import { get_orders, delete_document } from '../../actions/orders';
import SearchIcon from '@mui/icons-material/Search';
import ConfirmationDialog from '../layout/ConfirmationDialog/ConfirmationDialog';
import { ADMIN } from '../../utils/UserTypes';

const Orders = ({ orders, filters, get_orders, delete_document, userType }) => {
    const [anchorEle, setAnchorEle] = useState(null);
    const open = Boolean(anchorEle);
    const [selectedFilterMenu, setSelectedFilterMenu] = useState('');
    const [menuFilterSearch, setMenuFilterSearch] = useState('');
    const [searchDescription, setSearchDescription] = useState('');
    const [isFirstTimeGetRequestSend, setIsFirstTimeGetRequestSend] = useState(true);
    const [openDialog, setDialog] = useState(false);
    const [deleteDocumentId, setDeleteDocumentId] = useState(null);

    const [selectedFilters, setSelectedFilters] = useState({
        department: {},
        documentType: {},
        geography: {},
        technology: {},
        domain: {},
        client: {},
        fileType: {}
    });
    const [isLinkCopied, setLinkCopied] = useState(-1);
    const header = {
        serial: {
            title: '#',
        },
        order_id: {
            title: 'Order ID',
        },
        order_by: {
            title: 'Order By',
        },
        customer: {
            title: 'Customers',
        },
        products: {
            title: 'Products',
        },
        amount: {
            title: 'Amount',
        },
        address: {
            title: 'Address',
        },
        status: {
            title: 'Status',
        },
        created_at: {
            title: 'Created ',
        }
    }


    useEffect(() => {
        if (!isFirstTimeGetRequestSend) {
            const timer = setTimeout(() => {
                get_orders(getSelectedFilters(), searchDescription);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            get_orders(getSelectedFilters(), searchDescription);
            setIsFirstTimeGetRequestSend(false);
        }
        // eslint-disable-next-line
    }, [selectedFilters, searchDescription]);


    const onMenuOpenHandler = (e, value) => {
        setSelectedFilterMenu(value);
        setAnchorEle(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEle(null);
        setTimeout(() => {
            setMenuFilterSearch('');
        }, 1000);
    }

    const onKeyDown = (e) => {
        e.stopPropagation();
    }

    const onMenuFilterChange = (e) => {
        setMenuFilterSearch(e.target.value);
    }


    const getSelectedFilters = () => {
        const filters = {};
        for (let key in selectedFilters) {
            if (Object.keys(selectedFilters[key]).length > 0) {
                filters[key] = Object.keys(selectedFilters[key]);
            }
        }
        return filters;
    }

    const onToggleFilter = (bool, value) => {
        if (!bool) {
            setSelectedFilters(prevState => {
                let copyState = { ...prevState };
                delete copyState[selectedFilterMenu][value];
                return copyState;
            })
        } else if (bool) {
            setSelectedFilters(prevState => {
                let copyState = { ...prevState };
                copyState[selectedFilterMenu][value] = { checked: true }
                return copyState;
            })
        }
        // get_orders(selectedFilters)
    }

    const onDeleteDocument = async () => {
        const res = await delete_document(deleteDocumentId);
        setDialog(false);
        setDeleteDocumentId(null);
        if (res) {
            setSelectedFilters({
                department: {},
                documentType: {},
                geography: {},
                technology: {},
                domain: {},
                client: {},
                fileType: {}
            });
            setSearchDescription('');
            get_orders();
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <div className={styles['input-field']}>
                        <SearchIcon classes={{ root: styles.icon }} />
                        <input placeholder='Search by description' value={searchDescription} onChange={(e) => { setSearchDescription(e.target.value) }} />
                    </div>
                </div>
                <div className={styles['table-container']}>
                    <div className={styles['filters-container']}>
                        <div className={styles.header}>
                            Orders
                        </div>
                        <div className={styles.filters}>
                            <div className={styles.filter} onClick={(e) => {
                                onMenuOpenHandler(e, 'department');
                            }}>
                                <p>{header.serial.title} {Object.keys(selectedFilters.department).length > 0 ? `(${Object.keys(selectedFilters.department).length})` : ''}</p>
                                <ArrowDropDownIcon classes={{ root: styles.icon }} />
                            </div>
                            <div className={styles.filter} onClick={(e) => {
                                onMenuOpenHandler(e, 'documentType');
                            }}>
                                <p>{header.order_id.title} {Object.keys(selectedFilters.documentType).length > 0 ? `(${Object.keys(selectedFilters.documentType).length})` : ''}</p>
                                <ArrowDropDownIcon classes={{ root: styles.icon }} />
                            </div>
                            <div className={styles.filter} onClick={(e) => {
                                onMenuOpenHandler(e, 'geography');
                            }}>
                                <p>{header.products.title} {Object.keys(selectedFilters.geography).length > 0 ? `(${Object.keys(selectedFilters.geography).length})` : ''}</p>
                                <ArrowDropDownIcon classes={{ root: styles.icon }} />
                            </div>
                            <div className={styles.filter} onClick={(e) => {
                                onMenuOpenHandler(e, 'technology');
                            }}>
                                <p>{header.address.title} {Object.keys(selectedFilters.technology).length > 0 ? `(${Object.keys(selectedFilters.technology).length})` : ''}</p>
                                <ArrowDropDownIcon classes={{ root: styles.icon }} />
                            </div>
                            <div className={styles.filter} onClick={(e) => {
                                onMenuOpenHandler(e, 'domain');
                            }}>
                                <p>{header.status.title} {Object.keys(selectedFilters.domain).length > 0 ? `(${Object.keys(selectedFilters.domain).length})` : ''}</p>
                                <ArrowDropDownIcon classes={{ root: styles.icon }} />
                            </div>
                            <div className={styles.filter} onClick={(e) => {
                                onMenuOpenHandler(e, 'client');
                            }}>
                                <p>{header.created_at.title} {Object.keys(selectedFilters.client).length > 0 ? `(${Object.keys(selectedFilters.client).length})` : ''}</p>
                                <ArrowDropDownIcon classes={{ root: styles.icon }} />
                            </div>
                            <div className={styles.filter} onClick={(e) => {
                                onMenuOpenHandler(e, 'fileType');
                            }}>
                                <p>File Type {Object.keys(selectedFilters.fileType).length > 0 ? `(${Object.keys(selectedFilters.fileType).length})` : ''}</p>
                                <ArrowDropDownIcon classes={{ root: styles.icon }} />
                            </div>
                        </div>
                    </div>
                    <div className={styles['table-headers']}>
                        <div className={styles.header}>
                            <p>{header.serial.title}</p>
                        </div>
                        <div className={styles.header}>
                            <p>{header.order_id.title}</p>
                        </div>
                        <div className={styles.header}>
                            <p>{header.products.title}</p>
                        </div>
                        <div className={styles.header}>
                            <p>{header.customer.title}</p>
                        </div>
                        <div className={styles.header}>
                            <p>{header.amount.title}</p>
                        </div>
                        <div className={styles.header}>
                            <p>{header.address.title}</p>
                        </div>
                        <div className={styles.header}>
                            <p>{header.status.title}</p>
                        </div>
                        <div className={`${styles.header} ${styles.description}`}>
                            <p>{header.created_at.title}</p>
                        </div>
                        <div className={`${styles.header} ${styles.link}`}>
                            <p>Actions</p>
                        </div>
                    </div>
                    <div className={styles['body-container']}>
                        {
                            orders.length > 0 ? orders.map((d, index) => {
                                return (
                                    <div className={styles['body']} key={index}>
                                        <div className={styles.data}>
                                            <p>{d.department}</p>
                                        </div>
                                        <div className={styles.data}>
                                            <p>{d.documentType}</p>
                                        </div>
                                        <div className={styles.data}>
                                            <p>{d.geography}</p>
                                        </div>
                                        <div className={styles.data}>
                                            <p>{d.technology}</p>
                                        </div>
                                        <div className={styles.data}>
                                            <p>{d.domain}</p>
                                        </div>
                                        <div className={styles.data}>
                                            <p>{d.client}</p>
                                        </div>
                                        <div className={styles.data}>
                                            <p>{d.fileType}</p>
                                        </div>
                                        <div className={`${styles.data} ${styles.description}`}>
                                            <p>{d.description}</p>
                                        </div>
                                        <div className={`${styles.data} ${styles.link}`}>
                                            <Tooltip title="Open Document">
                                                <div onClick={() => {
                                                    window.open(d.documentLink, "_blank")
                                                }} className={`${styles.icon} ${styles.open}`}></div>
                                            </Tooltip>
                                            <Tooltip title={isLinkCopied === index ? "Copied" : "Copy Document Link"} onClick={() => {
                                                window.navigator["clipboard"].writeText(d.documentLink);
                                                setLinkCopied(index);
                                                setTimeout(() => {
                                                    setLinkCopied(-1)
                                                }, 5000);
                                            }}>
                                                <div className={`${styles.icon} ${styles.copy}`}></div>
                                            </Tooltip>
                                            {(userType === ADMIN) && (
                                                <Tooltip title="Delete Document">
                                                    <div onClick={() => {
                                                        setDeleteDocumentId(d.id);
                                                        setDialog(true);
                                                    }} className={`${styles.icon} ${styles.delete}`}></div>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </div>
                                )
                            }) : (
                                <div className={styles['body']}>
                                    <div className={styles.data} style={{ width: '100%' }}>
                                        <p style={{ textAlign: 'center' }}>No Data found</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={styles['table-footer']}>
                        {orders.length === 0 ? (
                            <p>0 Items</p>
                        ) : (
                                <p>1 - {orders.length} Items</p>
                        )}
                    </div>
                </div>
            </div>
            <Menu
                open={open}
                anchorEl={anchorEle}
                onClose={handleClose}
                classes={{ list: styles.menu }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                <div className={styles['menu-container']}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <p>{selectedFilterMenu && header[selectedFilterMenu].title}</p>
                        </div>
                    </div>
                    <div className={styles['input-field']}>
                        <SearchIcon classes={{ root: styles.icon }} />
                        <input placeholder='Type to search' onChange={onMenuFilterChange} onKeyDown={onKeyDown} />
                    </div>
                    <div className={styles['menu-items']}>
                        {
                            selectedFilterMenu && filters[selectedFilterMenu]?.filter(data => data.toLowerCase().includes(menuFilterSearch.toLowerCase())).map(data => {
                                return (
                                    <div key={data} className={styles['menu-item']}>
                                        <div>
                                            <Checkbox checked={Boolean(selectedFilters[selectedFilterMenu] && selectedFilters[selectedFilterMenu][data])} onChange={(e) => {
                                                onToggleFilter(e.target.checked, data);
                                            }} />
                                            <p>{data}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Menu>
            <ConfirmationDialog message='Are you sure you want to remove this document from the list?' open={openDialog} onClose={() => { setDialog(false); setDeleteDocumentId(null) }} cancelText="Cancel" confirmText="Delete" confirmBackgroundColor="red" onConfirm={onDeleteDocument} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        documents: state.document.documents,
        filters: state.document.filters,
        userType: state.auth.user?.type
    }
}

export default connect(mapStateToProps, { get_orders, delete_document })(Orders);