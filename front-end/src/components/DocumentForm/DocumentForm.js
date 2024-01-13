import React, { useState, useEffect } from 'react'
import styles from './DocumentForm.module.scss';
import { connect } from 'react-redux';
import { create_document, get_documents } from '../../actions/document';
import { Dialog } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Menu } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DocumentForm = ({ create_document, get_documents, filters }) => {
  const [anchorEle, setAnchorEle] = useState(null);
  const open = Boolean(anchorEle);
  const [selectedFilterMenu, setSelectedFilterMenu] = useState('');
  const [menuFilterSearch, setMenuFilterSearch] = useState('');
  const [data, setData] = useState({
    department: '',
    documentType: '',
    geography: '',
    technology: '',
    domain: '',
    client: '',
    description: '',
    fileType: '',
    documentLink: ''
  });
  const headers = {
    department: {
      title: 'Department',
    },
    documentType: {
      title: 'Document Type',
    },
    geography: {
      title: 'Geography',
    },
    technology: {
      title: 'Technology',
    },
    domain: {
      title: 'Domain',
    },
    client: {
      title: 'Client',
    },
    fileType: {
      title: 'File Type',
    }
  }
  const [openDialog, setOpenDialog] = useState(false);
  const history = useHistory();

  const onChangeHandler = (e) => {
    setData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    })
  }

  const getJsonData = () => {
    const jsonData = {};
    for (let key in data) {
      if (data[key].trim() !== '') {
        jsonData[key] = data[key];
      }
    }
    return jsonData;
  }

  const onSubmit = async () => {
    setOpenDialog(false);
    const res = await create_document(getJsonData());
    if (res) {
      setData({
        department: '',
        documentType: '',
        geography: '',
        technology: '',
        domain: '',
        client: '',
        description: '',
        fileType: '',
        documentLink: ''
      });
      history.push("/");
    }
  }

  const onMenuOpenHandler = (e, value) => {
    setSelectedFilterMenu(value);
    setAnchorEle(e.currentTarget);
  }
  // const onKeyDown = (e) => {
  //   e.stopPropagation();
  // }

  const handleClose = () => {
    setAnchorEle(null);
    setTimeout(() => {
      setMenuFilterSearch('');
    }, 1000);
  }

  const onMenuItemSelect = (header, value) => {
    setData(prevState => {
      return { ...prevState, [header]: value };
    });
    handleClose();
  }

  const filteredMenuList = selectedFilterMenu && filters[selectedFilterMenu]?.filter(data => data.toLowerCase().includes(menuFilterSearch.toLowerCase())).map(data => {
    return (
      <div key={data} className={`${styles['menu-item']}`} onClick={() => {
        onMenuItemSelect(selectedFilterMenu, data)
      }}>
        <p>{data}</p>
      </div>
    )
  })

  useEffect(() => {
    get_documents({})
  }, [get_documents])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Create New Document</p>
        </div>
        <div className={styles.form}>
          <div className={styles['input-field']}>
            <label>Department</label>
            <div className={styles.input}>
              <input value={data.department} autoComplete="none" onChange={onChangeHandler} name='department' placeholder='Select department' />
              <div className={styles['icon-container']} onClick={(e) => { onMenuOpenHandler(e, 'department') }}>
                <ArrowDropDownIcon classes={{root:styles.icon}} fontSize='medium' />
              </div>
            </div>
            {/* <div className={styles.input} onClick={(e) => { onMenuOpenHandler(e, 'department') }}>
              {data.department ? (
                <p>{data.department}</p>
              ) : <p className={styles.placeholder}>Select Department</p>}
            </div> */}
          </div>
          <div className={styles['input-field']}>
            <label>Document Type</label>
            <div className={styles.input}>
              <input value={data.documentType} autoComplete="none" onChange={onChangeHandler} name='documentType' placeholder='Select documentType' />
              <div className={styles['icon-container']} onClick={(e) => { onMenuOpenHandler(e, 'documentType') }}>
                <ArrowDropDownIcon classes={{root:styles.icon}} fontSize='medium' />
              </div>
            </div>
            {/* <input value={data.documentType} onChange={onChangeHandler} name='documentType' placeholder='Select document type' /> */}
            {/* <div className={styles.input} onClick={(e) => { onMenuOpenHandler(e, 'documentType') }}>
              {data.documentType ? (
                <p>{data.documentType}</p>
              ) : <p className={styles.placeholder}>Select Document Type</p>}
            </div> */}
          </div>
          <div className={styles['input-field']}>
            <label>Geography</label>
            <div className={styles.input}>
              <input value={data.geography} autoComplete="none" onChange={onChangeHandler} name='geography' placeholder='Select geography' />
              <div className={styles['icon-container']} onClick={(e) => { onMenuOpenHandler(e, 'geography') }}>
                <ArrowDropDownIcon classes={{root:styles.icon}} fontSize='medium' />
              </div>
            </div>
            {/* <input value={data.geography} onChange={onChangeHandler} name='geography' placeholder='Select geography' /> */}
            {/* <div className={styles.input} onClick={(e) => { onMenuOpenHandler(e, 'geography') }}>
              {data.geography ? (
                <p>{data.geography}</p>
              ) : <p className={styles.placeholder}>Select Geography</p>}
            </div> */}
          </div>
          <div className={styles['input-field']}>
            <label>Technology</label>
            <div className={styles.input}>
              <input value={data.technology} autoComplete="none" onChange={onChangeHandler} name='technology' placeholder='Select technology' />
              <div className={styles['icon-container']} onClick={(e) => { onMenuOpenHandler(e, 'technology') }}>
                <ArrowDropDownIcon classes={{root:styles.icon}} fontSize='medium' />
              </div>
            </div>
            {/* <input value={data.technology} onChange={onChangeHandler} name='technology' placeholder='Select technology' /> */}
            {/* <div className={styles.input} onClick={(e) => { onMenuOpenHandler(e, 'technology') }}>
              {data.technology ? (
                <p>{data.technology}</p>
              ) : <p className={styles.placeholder}>Select Technology</p>}
            </div> */}
          </div>
          <div className={styles['input-field']}>
            <label>Domain</label>
            <div className={styles.input}>
              <input value={data.domain} autoComplete="none" onChange={onChangeHandler} name='domain' placeholder='Select domain' />
              <div className={styles['icon-container']} onClick={(e) => { onMenuOpenHandler(e, 'domain') }}>
                <ArrowDropDownIcon classes={{root:styles.icon}} fontSize='medium' />
              </div>
            </div>
            {/* <input value={data.domain} onChange={onChangeHandler} name='domain' placeholder='Select domain' /> */}
            {/* <div className={styles.input} onClick={(e) => { onMenuOpenHandler(e, 'domain') }}>
              {data.domain ? (
                <p>{data.domain}</p>
              ) : <p className={styles.placeholder}>Select Domain</p>}
            </div> */}
          </div>
          <div className={styles['input-field']}>
            <label>Client</label>
            <div className={styles.input}>
              <input value={data.client} autoComplete="none" onChange={onChangeHandler} name='client' placeholder='Select client' />
              <div className={styles['icon-container']} onClick={(e) => { onMenuOpenHandler(e, 'client') }}>
                <ArrowDropDownIcon classes={{root:styles.icon}} fontSize='medium' />
              </div>
            </div>
            {/* <input value={data.client} onChange={onChangeHandler} name='client' placeholder='Select client' /> */}
            {/* <div className={styles.input} onClick={(e) => { onMenuOpenHandler(e, 'client') }}>
              {data.client ? (
                <p>{data.client}</p>
              ) : <p className={styles.placeholder}>Select Client</p>}
            </div> */}
          </div>
          <div className={styles['input-field']}>
            <label>File Type</label>
            <div className={styles.input}>
              <input value={data.fileType} autoComplete="none" onChange={onChangeHandler} name='fileType' placeholder='Select fileType' />
              <div className={styles['icon-container']} onClick={(e) => { onMenuOpenHandler(e, 'fileType') }}>
                <ArrowDropDownIcon classes={{root:styles.icon}} fontSize='medium' />
              </div>
            </div>
            {/* <input value={data.fileType} onChange={onChangeHandler} name='fileType' placeholder='Select file type' /> */}
            {/* <div className={styles.input} onClick={(e) => { onMenuOpenHandler(e, 'fileType') }}>
              {data.fileType ? (
                <p>{data.fileType}</p>
              ) : <p className={styles.placeholder}>Select File Type</p>}
            </div> */}
          </div>
          <div className={styles['input-field']}>
            <label>Description</label>
            <input value={data.description} onChange={onChangeHandler} name='description' placeholder='Enter description' />
            {/* <textarea rows={2} name='description' placeholder='Select description'></textarea> */}
          </div>
          <div className={styles['input-field']} style={{ width: '100%' }}>
            <label>File URL</label>
            <input value={data.documentLink} onChange={onChangeHandler} name='documentLink' placeholder='Enter file url' />
          </div>
        </div>
      </div>
      <div className={styles['btn-container']}>
        <button onClick={() => { setOpenDialog(true) }}>Submit</button>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        classes={{ root: styles['dialog'] }}
      >
        <div className={styles['dialog-container']}>
          <p>Confirmation</p>
          <p>Do you confirm the details?</p>
          <div className={styles.action}>
            <button onClick={() => { setOpenDialog(false) }}>Cancel</button>
            <button onClick={onSubmit}>Proceed</button>
          </div>
        </div>
      </Dialog>
      <Menu
        open={open}
        transitionDuration={0}
        anchorEl={anchorEle}
        onClose={handleClose}
        classes={{ list: styles.menu }}
        PaperProps={{
          style: {
            transform: `${['documentType', 'technology', 'client'].includes(selectedFilterMenu) ? 'translateX(-20%)' : 'translateX(-90%)'}`,
          }
        }}
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
              <p>{selectedFilterMenu && headers[selectedFilterMenu].title}</p>
            </div>
          </div>
          {/* <div className={styles['input-field']}>
            <SearchIcon classes={{ root: styles.icon }} />
            <input placeholder='Type to search' onChange={(e) => { setMenuFilterSearch(e.target.value) }} onKeyDown={onKeyDown} />
            <button onClick={() => {
              onMenuItemSelect(selectedFilterMenu, menuFilterSearch)
            }}>+Add</button>
          </div> */}
          <div className={styles['menu-items']}>
            {
              filteredMenuList && filteredMenuList.length > 0 ? filteredMenuList : (
                <div className={`${styles['not-found']} ${styles['menu-item']}`}>
                  <p>No search found</p>
                </div>
              )
            }
          </div>
        </div>
      </Menu>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    filters: state.document.filters
  }
}

export default connect(mapStateToProps, { create_document, get_documents })(DocumentForm)